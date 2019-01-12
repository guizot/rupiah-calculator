/* EXPORT FUNCTION */
let checkValid = value => {
  if (value === "") {
    return { error: true, msg: "Please write amount of rupiah" };
  }
  let withRp = value.substring(0, 2).toLowerCase() === "rp";
  let firstChar = isNaN(parseInt(value.substring(0, 1)));
  let lastChar = isNaN(parseInt(value.substr(-1)));
  let errorMissing = { error: true, msg: "Oops, Missing value" };
  if (withRp) {
    return funcWithRp({ value, firstChar, lastChar, errorMissing });
  }
  if (!withRp) {
    return funcNotRp({ value, firstChar, lastChar, errorMissing });
  }
};

/* CALCULATE WITH RP */
function funcWithRp(params) {
  let { value, firstChar, lastChar, errorMissing } = params;
  let errors = firstChar && lastChar;
  if (errors) {
    return errorMissing;
  }
  if (firstChar && !lastChar) {
    let idx = value.split("").findIndex(item => !isNaN(parseInt(item)));
    let spareNum = value.substring(2, idx);
    let cekfilter = spareNum.split("").filter(fi => fi !== " ");
    let cek = cekfilter.find(fi => isNaN(parseInt(fi)));
    if (cek !== undefined) {
      return errorMissing;
    }
    value = value.substring(idx, value.length);
    firstChar = false;
    lastChar = false;
    let getFuncNotRp = funcNotRp({ value, firstChar, lastChar, errorMissing });
    return getFuncNotRp;
  }
}

/* CALCULATE WITHOUT RP */
function funcNotRp(params) {
  let { value, firstChar, lastChar, errorMissing } = params;
  let errors =
    (firstChar && lastChar) ||
    (!firstChar && lastChar) ||
    (firstChar && !lastChar);
  if (errors) {
    return errorMissing;
  }
  if (!firstChar && !lastChar) {
    let cek = value.split("").find(fi => isNaN(parseInt(fi)));
    if (cek !== undefined && cek !== "." && cek !== ",") {
      return errorMissing;
    }
    if (parseInt(value[0]) === 0) { //GET RID 0
      let idx = value.split("").findIndex(item => parseInt(item) !== 0);
      value = value.substring(idx, value.length);
      let calculated = calcProcess(value, errorMissing);
      return calculated;
    } else {
      let calculated = calcProcess(value, errorMissing);
      return calculated;
    }
  }
}

/* CALCULATE PROCESS */
function calcProcess(value, errorMissing) {
  let dots = value.indexOf(".") !== -1;
  let comma = value.indexOf(",") !== -1;
  let space = value.indexOf(" ") !== -1;
  if (space) {
    return { error: true, msg: "Can not use space for separator" };
  }
  if (!dots && comma) {
    return { error: true, msg: "Can not use comma for separator" };
  }
  if (dots && comma) {
    let valComma = value.substring(value.indexOf(",") + 1, value.length);
    let cekComma = valComma.split("").find(fi => isNaN(parseInt(fi)));
    if (cekComma) {
      return errorMissing;
    }
    value = value.substring(0, value.indexOf(","));
  }
  let getNum = value.replace(/\D/g, "");
  let repNum = getNum.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  if (value !== repNum && dots) {
    return { error: true, msg: "Oops, Invalid currency separator" };
  }
  return { error: false, value: parseInt(value.replace(/\D/g, "")) };
}

/* RETURN FUNCTION */
export default checkValid;
