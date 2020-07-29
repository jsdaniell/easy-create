function randomiza(n) {
  var ranNum = Math.round(Math.random() * n);
  return ranNum;
}

export default function generateRG(format) {
  let value;

  let num_rg = 4;
  let rg1 = new Array(num_rg);
  let rg2 = new Array(num_rg);

  rg1[0] = "911225341";
  rg2[0] = "91.122.534-1";
  rg1[1] = "403289440";
  rg2[1] = "4.032.894-40";
  rg1[2] = "418757896";
  rg2[2] = "41.875.789-6";
  rg1[3] = "2977269";
  rg2[3] = "2.977.269";
  rg1[4] = "429434121";
  rg2[4] = "42.943.412-1";

  // if (format){
      value = rg1[randomiza(num_rg)];
  // } else {
  //     value = rg2[randomiza(num_rg)];
  // }



  return value;
}
