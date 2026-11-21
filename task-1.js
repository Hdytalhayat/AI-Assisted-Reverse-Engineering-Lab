const _0x1a = ["U2VjcmV0S2V5", "QWt2c19EdGFy", "QWRtaW4yMDI2", "QWtzZXMgRGl0ZXJpbWEh", "QWtzZXMgRGl0b2xhayE="];
function _0x2b(i) {
  return Buffer.from(_0x1a[i], "base64").toString("utf8");
}
function cekAkses(input) {
  const bagian1 = _0x2b(0).slice(0, 6);
  const bagian2 = _0x2b(2).slice(5);
  const kunciBenar = bagian1 + "-" + bagian2;
  if (input === kunciBenar) {
    console.log(_0x2b(3));
  } else {
    console.log(_0x2b(4));
  }
}
const args = process.argv.slice(2);
cekAkses(args[0] || "");