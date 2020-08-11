import jsPdf from "jspdf";
import "jspdf-autotable";

export default function exportOnPdf(caseData) {
  let doc = new jsPdf("p", "pt");

  let idRow = [
    {
      rowSpan: 1,
      content: "ID",
      styles: { valign: "middle", halign: "center" }
    },
    caseData.id
  ];

  let environmentRow = [
    {
      rowSpan: 1,
      content: "Environment",
      styles: { valign: "middle", halign: "center" }
    },
    caseData.environment
  ];

  let nameRow = [
    {
      rowSpan: 1,
      content: "Name",
      styles: { valign: "middle", halign: "center" }
    },
    caseData.name
  ];

  let actorRow = [
    {
      rowSpan: 1,
      content: "Actor",
      styles: { valign: "middle", halign: "center" }
    },
    caseData.actor
  ];

  let postConditionRow = [
    {
      rowSpan: 1,
      content: "Post Condition",
      styles: { valign: "middle", halign: "center" }
    },
    caseData.postcondition
  ];

  let preconditionRows = [];

  caseData.preconditions.forEach((item, index) => {
    if (!index) {
      preconditionRows.push([
        {
          rowSpan: caseData.preconditions.length,
          content: "Preconditions",
          styles: { valign: "middle", halign: "center" }
        },
        item
      ]);
    } else {
      preconditionRows.push([item]);
    }
  });

  let proceduresRows = [];

  let lengthProcedures = caseData.listProcedures.length;

  caseData.listProcedures.forEach(
    item => (lengthProcedures += item.sublist.length)
  );

  caseData.listProcedures.forEach((item, index) => {
    if (!index) {
      proceduresRows.push([
        {
          rowSpan: lengthProcedures,
          content: "Procedures",
          styles: { valign: "middle", halign: "center" }
        },
        `${index + 1}. ${item.content}`
      ]);

      item.sublist.forEach((i, ind) =>
        proceduresRows.push([`      ${index + 1}.${ind + 1} ${i}`])
      );
    } else {
      proceduresRows.push([`${index + 1}. ${item.content}`]);

      item.sublist.forEach((i, ind) =>
        proceduresRows.push([`      ${index + 1}.${ind + 1} ${i}`])
      );
    }
  });

  console.log(proceduresRows);

  let body = [];

  if (caseData.id) {
    body.push(idRow);
  }

  if (caseData.environment) {
    body.push(environmentRow);
  }

  if (caseData.name) {
    body.push(nameRow);
  }

  if (caseData.actor) {
    body.push(actorRow);
  }

  if (caseData.preconditions.length) {
    body.push(...preconditionRows);
  }

  if (caseData.listProcedures.length) {
    body.push(...proceduresRows);
  }
  if (caseData.postcondition.length) {
    body.push(postConditionRow);
  }

  doc.autoTable({
    startY: 60,
    head: [
      [
        {
          content: caseData.title,
          colSpan: 2,
          styles: { halign: "center", fillColor: "#3A4065" }
        }
      ]
    ],
    body: body,
    theme: "grid"
  });

  doc.save(caseData.title);
}
