const _decoy = "ADMIN-KEY-9999";
const _secretXor = [0x21, 0x23, 0x21, 0x25];
const _targetHex = "57494e";

function verifyPartA(str) {
  if (str.length !== 4) return false;
  for (let i = 0; i < 4; i++) {
    if ((str.charCodeAt(i) ^ 0x13) !== _secretXor[i]) {
      return false;
    }
  }
  return true;
}

function verifyPartB(str) {
  return Buffer.from(str, "utf8").toString("hex") === _targetHex;
}

function checkLicense(key) {
  if (!key || key.length !== 12) return false;
  if (!key.startsWith("REA-")) return false;
  if (key[8] !== "-") return false;

  const partA = key.slice(4, 8);
  const partB = key.slice(9, 12);

  return verifyPartA(partA) && verifyPartB(partB);
}

const input = process.argv[2] || "";
if (checkLicense(input)) {
  console.log("Lisensi Valid! Selamat datang.");
} else {
  console.log("Lisensi Tidak Valid!");
}