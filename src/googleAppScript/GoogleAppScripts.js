function doGet(e) {
    const SHEET_NAME = e.parameter.sheet ? e.parameter.sheet : "orders";
    
    try {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

        const values = sheet.getDataRange().getValues();

        if (values.length <= 1) {
            return json({
            result: "success",
            data: [],
            });
        }

        const headers = values.shift();

        const data = values.map(row => {
            const obj = {};

            headers.forEach((header, index) => {
            obj[String(header).toLowerCase().replace(/\s+/g, "")] = row[index];
            });

            return obj;
        });

        return json({
            result: "success",
            data,
        });

        } catch (err) {
        return json({
            result: "error",
            message: err.toString(),
        });
    }
}

function doPost(e) {
  try {
    const body = JSON.parse(e.parameter.payload);

    switch (body.action) {
      case "add":
        return addOrder(body.data);

      case "edit":
        return editOrder(body.data);

      case "delete":
        return deleteOrder(body.id);

      default:
        return json({
          result: "error",
          message: "Unknown action.",
        });
    }

  } catch (err) {
    return json({
      result: "error",
      message: err.toString(),
    });
  }
}

function addOrder(order) {

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

  const lastRow = sheet.getLastRow();

  const id =
  lastRow <= 1
    ? 1
    : Number(sheet.getRange(lastRow, 1).getValue()) + 1;

  sheet.appendRow([
    id,
    order.name,
    order.size,
    order.ispaid,
    order.amount,
    order.dateordered,
    order.orderfrom,
    order.isdelivered,
    order.notes,
  ]);

  return json({
    result: "success",
    message: "Order added.",
    id,
  });
}

function editOrder(order) {

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

  const values = sheet.getDataRange().getValues();

  for (let i = 1; i < values.length; i++) {

    if (String(values[i][0]) === String(order.id)) {

      sheet.getRange(i + 1, 2).setValue(order.name);
      sheet.getRange(i + 1, 3).setValue(order.size);
      sheet.getRange(i + 1, 4).setValue(order.ispaid);
      sheet.getRange(i + 1, 5).setValue(order.amount);
      sheet.getRange(i + 1, 6).setValue(order.dateordered);
      sheet.getRange(i + 1, 7).setValue(order.orderfrom);
      sheet.getRange(i + 1, 8).setValue(order.isdelivered);
      sheet.getRange(i + 1, 9).setValue(order.notes);

      return json({
        result: "success",
        message: "Order updated.",
      });
    }
  }

  return json({
    result: "error",
    message: "Order not found.",
  });
}

function deleteOrder(id) {

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

  const values = sheet.getDataRange().getValues();

  for (let i = 1; i < values.length; i++) {

    if (String(values[i][0]) === String(id)) {

      sheet.deleteRow(i + 1);

      return json({
        result: "success",
        message: "Order deleted.",
      });
    }
  }

  return json({
    result: "error",
    message: "Order not found.",
  });
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}