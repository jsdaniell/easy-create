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

  let priorityRow = [
    {
      rowSpan: 1,
      content: "Priority",
      styles: { valign: "middle", halign: "center" }
    },
    caseData.priority
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

  caseData.procedures.forEach((item, index) => {
    if (!index) {
      proceduresRows.push([
        {
          rowSpan: caseData.procedures.length,
          content: "Procedures",
          styles: { valign: "middle", halign: "center" }
        },
        item
      ]);
    } else {
      proceduresRows.push([item]);
    }
  });

  let body = [];

  if (caseData.id) {
    body.push(idRow);
  }

  if (caseData.environment) {
    body.push(environmentRow);
  }

  if (caseData.priority) {
    body.push(priorityRow);
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

  if (caseData.procedures.length) {
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
