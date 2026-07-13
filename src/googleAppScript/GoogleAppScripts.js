function doGet(e) {  
  try {
    const sheetName = e.parameter.sheet || "orders";
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

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
      case "addExpense":
        return addRow(body);

      case "edit":
      case "editExpense":
        return editRow(body);

      case "delete":
      case "deleteExpense":
        return deleteRow(body);
      
      case "refresh":
        return refreshInventory(body.data);

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

function addRow(body) {

  const sheetName = body.action == "edit" ? "orders" : "expenses";
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("sheetName");

  const lastRow = sheet.getLastRow();

  const id =
  lastRow <= 1
    ? 1
    : Number(sheet.getRange(lastRow, 1).getValue()) + 1;

  if (body.action == "edit") {
    sheet.appendRow([
      id,
      body.data.name,
      body.data.size,
      body.data.ispaid,
      body.data.amount,
      body.data.dateordered,
      body.data.orderfrom,
      body.data.isdelivered,
      body.data.notes
    ]);
  } else {
      sheet.appendRow([
        id,
        body.data.name,
        body.data.amount,
        body.data.date,
        body.data.ispaid,
        body.data.notes
      ]);
  }

  return json({
    result: "success",
    message: "Order added.",
    id,
  });
}

function editRow(body) {

  const sheetName = body.action == "edit" ? "orders" : "expenses";
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("sheetName");

  const values = sheet.getDataRange().getValues();

  for (let i = 1; i < values.length; i++) {
    if (String(values[i][0]) === String(body.data.id)) {

      if (body.action == "edit") {
        sheet.getRange(i + 1, 2).setValue(body.data.name);
        sheet.getRange(i + 1, 3).setValue(body.data.size);
        sheet.getRange(i + 1, 4).setValue(body.data.ispaid);
        sheet.getRange(i + 1, 5).setValue(body.data.amount);
        sheet.getRange(i + 1, 6).setValue(body.data.dateordered);
        sheet.getRange(i + 1, 7).setValue(body.data.orderfrom);
        sheet.getRange(i + 1, 8).setValue(body.data.isdelivered);
        sheet.getRange(i + 1, 9).setValue(body.data.notes);

        return json({
          result: "success",
          message: "Order updated.",
        });
      }
      else {
        sheet.getRange(i + 1, 2).setValue(body.data.name);
        sheet.getRange(i + 1, 3).setValue(body.data.amount);
        sheet.getRange(i + 1, 4).setValue(body.data.date);
        sheet.getRange(i + 1, 5).setValue(body.data.ispaid);
        sheet.getRange(i + 1, 6).setValue(body.data.notes);

        return json({
          result: "success",
          message: "Expese updated.",
        });
      }
    }
  }

  return json({
    result: "error",
    message: "Order not found.",
  });
}

function deleteRow(body) {

  const sheetName = body.action == "edit" ? "orders" : "expenses";
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("sheetName");

  const values = sheet.getDataRange().getValues();

  for (let i = 1; i < values.length; i++) {

    if (String(values[i][0]) === String(body.id)) {

      sheet.deleteRow(i + 1);

      return json({
        result: "success",
        message: body.action == "edit" ? "Order deleted.": "Expense deleted",
      });
    }
  }

  return json({
    result: "error",
    message: body.action == "edit" ? "Order not found." : "Expense not found.",
  });
}

function refreshInventory(data) {

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("variants");
  const values = sheet.getDataRange().getValues();

  // Create lookup: size -> row number
  const rows = {};

  for (let i = 1; i < values.length; i++) {
    rows[values[i][3]] = i + 1; // Sheet row number
  }

  data.forEach(item => {
    const row = rows[item.size];

    if (row) {
      sheet.getRange(row, 6).setValue(item.qty); // Reserved
    }
  });

  return json({
    result: "success",
    message: "Inventory updated.",
  });
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}