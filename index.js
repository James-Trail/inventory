const fs = require("fs");
const path = require("path");


const stock = JSON.parse(fs.readFileSync(path.join(__dirname, "json", "stock.json")));
const transactions = JSON.parse(fs.readFileSync(path.join(__dirname, "json", "transactions.json")));

function checkStock(sku) {

    let currentStock = stock.find(s => s.sku === sku);
    let currentTrans = transactions.filter(t => t.sku === sku);
    let inventoryStock = 0;

    if (!currentStock && !currentTrans.length) {
        throw new Error("no SKU found");
    }

    //  set the current inventoryStock to the currentStock.qty value if it exists
    //  otherwise if there isnt anything in the currentStock then default stays at 0
    if (currentStock && currentStock.stock) {
        inventoryStock = currentStock.stock;
    }


    //  loop over the current Transactions, if we have a order then subtract the qty, if we have a refund add 
    for (let i=0; i < currentTrans.length; i++) {
        let transaction = currentTrans[i];
        if (transaction.type === "order") {
            inventoryStock -= transaction.qty;
        }
        else if (transaction.type === "refund") {
            inventoryStock += transaction.qty;
        }
    }

    return { sku: sku, qty: inventoryStock };
    
}

module.exports = checkStock;

var args = process.argv.slice(2);
let sku = args[0];
if (sku) {
    console.log(checkStock(sku));
}
