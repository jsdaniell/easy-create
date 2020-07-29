function randomiza(n) {
  var ranNum = Math.round(Math.random() * n);
  return ranNum;
}

export default function generateCep() {
  let value;

  let num_cep = 20;
  let cep1 = new Array(num_cep);
  let cep2 = new Array(num_cep);

  cep1[0] = "78994000";
  cep2[0] = "78994-000";
  cep1[1] = "78994800";
  cep2[1] = "78994-800";
  cep1[2] = "78956000";
  cep2[2] = "78956-000";
  cep1[3] = "13500110";
  cep2[3] = "13500-110";
  cep1[4] = "78931000";
  cep2[4] = "78931-000";
  cep1[5] = "78967800";
  cep2[5] = "78967-800";
  cep1[6] = "13092150";
  cep2[6] = "13092-150";
  cep1[7] = "78968000";
  cep2[7] = "78968-000";
  cep1[8] = "13537000";
  cep2[8] = "13537-000";
  cep1[9] = "78993000";
  cep2[9] = "78993-000";
  cep1[10] = "78973000";
  cep2[10] = "78973-000";
  cep1[11] = "78990000";
  cep2[11] = "78990-000";
  cep1[12] = "13500000";
  cep2[12] = "13500-000";
  cep1[13] = "20521110";
  cep2[13] = "20521-110";
  cep1[14] = "20530350";
  cep2[14] = "20530-350";
  cep1[15] = "20260160";
  cep2[15] = "20260-160";
  cep1[16] = "20511170";
  cep2[16] = "20511-170";
  cep1[17] = "13500313";
  cep2[17] = "13500-313";
  cep1[18] = "20511330";
  cep2[18] = "20511-330";
  cep1[19] = "13506555";
  cep2[19] = "13506-555";
  cep1[20] = "20530350";
  cep2[20] = "20530-350";

  // if (document.getElementById('so_num_cep').checked==true)
  //     obj.value = cep2[randomiza(num_cep)];
  // else
  value = cep1[randomiza(num_cep)];

  return value;
}
