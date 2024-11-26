function addRow() {
    const table = document.querySelector("table tbody");
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td><button class="btn btn-danger" onclick="deleteRow(this)">D</button></td>
        <td><input class="form-control" type="number" value="${table.rows.length}" readonly></td>
        <td><input type="text" class="form-control item-name"></td>
        <td><input type="number" class="form-control item-price" onkeyup="updateRow(this)"></td>
        <td><input type="number" value="1" class="form-control item-qty" onkeyup="updateRow(this)"></td>
        <td><input type="number" class="form-control item-total" readonly></td>`;
    table.appendChild(newRow);
}
function deleteRow(button) {
    const row = button.closest("tr");
    row.remove();
    calculateSubtotal();
}
function updateRow(input) {
    const row = input.closest("tr");
    const price = parseFloat(row.querySelector(".item-price").value) || 0;
    const qty = parseFloat(row.querySelector(".item-qty").value) || 0;
    const total = price * qty;
    row.querySelector(".item-total").value = total.toFixed(2);
    calculateSubtotal();
}

function calculateSubtotal() {
    let subtotal = 0;
    document.querySelectorAll(".item-total").forEach(input => {
        subtotal += parseFloat(input.value) || 0;
    });
    document.getElementById("subtotal").value = subtotal.toFixed(2);
    calculateTax();
}
function printInvoice() {
    window.print();
}
function saveInvoice() {
    const rows = document.querySelectorAll("table tbody tr");
    let data = "Item Name,Price,Quantity,Total\n";
    rows.forEach(row => {
        const name = row.querySelector(".item-name")?.value || "Unnamed";
        const price = row.querySelector(".item-price")?.value || 0;
        const qty = row.querySelector(".item-qty")?.value || 0;
        const total = row.querySelector(".item-total")?.value || 0;
        data += `${name},${price},${qty},${total}\n`;
    });
    const blob = new Blob([data], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "invoice.txt";
    a.click();
}
function applyDiscount() {
    const subtotal = parseFloat(document.getElementById("subtotal").value) || 0;
    const tax = parseFloat(document.getElementById("taxtotal").value) || 0;
    const discount = parseFloat(document.getElementById("discount").value) || 0;
    const discountAmount = (discount / 100) * subtotal;
    const netTotal = subtotal - discountAmount + tax;
    document.getElementById("nettotal").value = netTotal.toFixed(2);
}
function updateItemCount() {
    const rows = document.querySelectorAll("table tbody tr").length;
    document.getElementById("item-count").textContent = rows;
}
function validateInput(input) {
    if (input.value < 0) {
        alert("Value cannot be negative");
        input.value = 0;
    }
}
document.getElementById("date").textContent = new Date().toLocaleString();
function updateTotalItems() {
    const rows = document.querySelectorAll("table tr").length - 2; // Exclude headers and subtotal row
    document.getElementById("total-items").textContent = rows;
}
function addRow() {
    const table = document.querySelector("table tbody");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td><button class="btn btn-danger" onclick="deleteRow(this)">D</button></td>
        <td><input class="form-control" type="number" value="1" readonly></td>
        <td><input class="form-control" type="text"></td>
        <td><input class="form-control" type="number" onkeyup="updateRow(this)"></td>
        <td><input class="form-control" type="number" value="1" onkeyup="updateRow(this)"></td>
        <td><input class="form-control" type="number" readonly></td>
    `;
    table.appendChild(row);
    updateTotalItems();
}

function clearAll() {
    const table = document.querySelector("table tbody");
    table.innerHTML = ""; // Clear all rows
    updateTotalItems();
}

function printInvoice() {
    window.print();
}
function getTotel()
{
    alert('functionworks')
var price = document.getElementById('item_price').value;
var qty = document.getElementById('item_qty').value;
var tot = price*qty;
document.getElementById('total').value = tot;
document.getElementById('subtotal').value = tot;
}
function calculateTax()
{
    var amt = document.getElementById('subtotal').value;
    var tax = document.getElementById('tax').value;
    var taxamount = (tax*amt)/100;
    var neet1 = Number(amt)+Number(taxamount);
    document.getElementById('taxtotal').value=taxamount;
    document.getElementById('nettotal').value=neet1;
}