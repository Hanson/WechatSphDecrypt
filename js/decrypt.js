class RandCtx64 {
  constructor(encKey) {
    this.RandCnt = 255;
    this.Seed = new Array(256).fill(0n);
    this.MM = new Array(256).fill(0n);
    this.AA = 0n;
    this.BB = 0n;
    this.CC = 0n;
    this.rand64Init(encKey);
  }

  rand64Init(encKey) {
    const golden = 0x9e3779b97f4a7c13n;
    let a = golden;
    let b = golden;
    let c = golden;
    let d = golden;
    let e = golden;
    let f = golden;
    let g = golden;
    let h = golden;

    this.Seed[0] = BigInt(encKey);
    for (let i = 1; i < 256; i++) {
      this.Seed[i] = 0n;
    }

    for (let i = 0; i < 4; i++) {
      ({ a, b, c, d, e, f, g, h } = this.mix(a, b, c, d, e, f, g, h));
    }

    for (let i = 0; i < 256; i += 8) {
      a = (a + this.Seed[i]) & 0xffffffffffffffffn;
      b = (b + this.Seed[i + 1]) & 0xffffffffffffffffn;
      c = (c + this.Seed[i + 2]) & 0xffffffffffffffffn;
      d = (d + this.Seed[i + 3]) & 0xffffffffffffffffn;
      e = (e + this.Seed[i + 4]) & 0xffffffffffffffffn;
      f = (f + this.Seed[i + 5]) & 0xffffffffffffffffn;
      g = (g + this.Seed[i + 6]) & 0xffffffffffffffffn;
      h = (h + this.Seed[i + 7]) & 0xffffffffffffffffn;
      ({ a, b, c, d, e, f, g, h } = this.mix(a, b, c, d, e, f, g, h));
      this.MM[i] = a;
      this.MM[i + 1] = b;
      this.MM[i + 2] = c;
      this.MM[i + 3] = d;
      this.MM[i + 4] = e;
      this.MM[i + 5] = f;
      this.MM[i + 6] = g;
      this.MM[i + 7] = h;
    }

    for (let i = 0; i < 256; i += 8) {
      a = (a + this.MM[i]) & 0xffffffffffffffffn;
      b = (b + this.MM[i + 1]) & 0xffffffffffffffffn;
      c = (c + this.MM[i + 2]) & 0xffffffffffffffffn;
      d = (d + this.MM[i + 3]) & 0xffffffffffffffffn;
      e = (e + this.MM[i + 4]) & 0xffffffffffffffffn;
      f = (f + this.MM[i + 5]) & 0xffffffffffffffffn;
      g = (g + this.MM[i + 6]) & 0xffffffffffffffffn;
      h = (h + this.MM[i + 7]) & 0xffffffffffffffffn;
      ({ a, b, c, d, e, f, g, h } = this.mix(a, b, c, d, e, f, g, h));
      this.MM[i] = a;
      this.MM[i + 1] = b;
      this.MM[i + 2] = c;
      this.MM[i + 3] = d;
      this.MM[i + 4] = e;
      this.MM[i + 5] = f;
      this.MM[i + 6] = g;
      this.MM[i + 7] = h;
    }

    this.isAAC64();
  }

  isAAC64() {
    this.CC = (this.CC + 1n) & 0xffffffffffffffffn;
    this.BB = (this.BB + this.CC) & 0xffffffffffffffffn;

    for (let i = 0; i < 256; i++) {
      switch (i % 4) {
        case 0:
          this.AA = ~(this.AA ^ (this.AA << 21n)) & 0xffffffffffffffffn;
          break;
        case 1:
          this.AA ^= this.AA >> 5n;
          break;
        case 2:
          this.AA ^= this.AA << 12n;
          break;
        case 3:
          this.AA ^= this.AA >> 33n;
          break;
      }

      this.AA = (this.AA + this.MM[(i + 128) % 256]) & 0xffffffffffffffffn;
      const x = this.MM[i];
      const y = (this.MM[Number((x >> 3n) % 256n)] + this.AA + this.BB) & 0xffffffffffffffffn;
      this.MM[i] = y;
      this.BB = (this.MM[Number((y >> 11n) % 256n)] + x) & 0xffffffffffffffffn;
      this.Seed[i] = this.BB;
    }
  }

  ISAacRandom() {
    const result = this.Seed[this.RandCnt];
    if (this.RandCnt === 0) {
      this.isAAC64();
      this.RandCnt = 255;
    } else {
      this.RandCnt--;
    }
    return result;
  }

  mix(a, b, c, d, e, f, g, h) {
    a = (a - e) & 0xffffffffffffffffn;
    f = (f ^ (h >> 9n)) & 0xffffffffffffffffn;
    h = (h + a) & 0xffffffffffffffffn;
    b = (b - f) & 0xffffffffffffffffn;
    g = (g ^ (a << 9n)) & 0xffffffffffffffffn;
    a = (a + b) & 0xffffffffffffffffn;
    c = (c - g) & 0xffffffffffffffffn;
    h = (h ^ (b >> 23n)) & 0xffffffffffffffffn;
    b = (b + c) & 0xffffffffffffffffn;
    d = (d - h) & 0xffffffffffffffffn;
    a = (a ^ (c << 15n)) & 0xffffffffffffffffn;
    c = (c + d) & 0xffffffffffffffffn;
    e = (e - a) & 0xffffffffffffffffn;
    b = (b ^ (d >> 14n)) & 0xffffffffffffffffn;
    d = (d + e) & 0xffffffffffffffffn;
    f = (f - b) & 0xffffffffffffffffn;
    c = (c ^ (e << 20n)) & 0xffffffffffffffffn;
    e = (e + f) & 0xffffffffffffffffn;
    g = (g - c) & 0xffffffffffffffffn;
    d = (d ^ (f >> 17n)) & 0xffffffffffffffffn;
    f = (f + g) & 0xffffffffffffffffn;
    h = (h - d) & 0xffffffffffffffffn;
    e = (e ^ (g << 14n)) & 0xffffffffffffffffn;
    g = (g + h) & 0xffffffffffffffffn;

    return { a, b, c, d, e, f, g, h };
  }
}

function decryptData(data, encLen, tmpKey) {
  if (data.length === 0 || data.length < encLen) {
    return;
  }

  const aaInst = new RandCtx64(tmpKey);

  for (let i = 0; i < encLen; i += 8) {
    const randNumber = aaInst.ISAacRandom();
    const tempNumber = new Array(8);
    for (let j = 0; j < 8; j++) {
      tempNumber[7 - j] = Number((randNumber >> BigInt(j * 8)) & 0xffn);
    }

    for (let j = 0; j < 8; j++) {
      const realIndex = i + j;
      if (realIndex >= encLen) {
        return;
      }
      data[realIndex] ^= tempNumber[j];
    }
  }
}
export { decryptData };
