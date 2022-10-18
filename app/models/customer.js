// constructor for customer object 정의 
// & write CRUD function using DB connect

const sql = require("./db");

// create new Customers constructor
const Customer = function(customer) {
  this.name = customer.name;
  this.active = customer.active;
};

// create new Customers tuple
Customer.create = (newCustomer, result) => {
  sql.query("INSERT INTO customers SET ?", newCustomer, (err, res) => {
    if(err) {
      console.log("error", err);
      result(err, null);
      return;
    }

    console.log("Create customer", {id: res.insertId, ...newCustomer});
    result(null, {id: res.insertId, ...newCustomer});
    
  });
};

/*  select * from customer where id = ? */
Customer.findById = (customerID, result) => {
  sql.query("SELECT * FROM customers WHERE id = ?", customerID, (err, res) => {
    if(err) {
      console.log("error", error);
      result(err, null);
      return;
    }
    if(res.length) {
      console.log("found customer", res[0]);
      result(null, res[0]);
      return;
    }

    //no result case
    result({kind: "not found"}, null);
  });
};

/*  select * from customer */
Customer.getAll = result => {
  sql.query("SELECT * FROM customers", (err, res) => {
    if(err) {
      console.log("error:", err);
      result(err, null);
      return;
    }
    
    console.log("customer:", res);
    result(null, res);
  });
};

/*  update customer set name = ?, ...*/
Customer.updateById = (id, customer, result) => {
  sql.query("UPDATE customers SET name =?, active = ? WHERE id = ?", 
  [customer.name, customer.active, id], (err,res) => {
    if(err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    //no result
    if(res.affectedRows == 0) {
      result({kind: "not found"}, null);
      return;
    }

    console.log("update customer: ", {id:id, ...Customer});
    result(null, {id:id, ...Customer});
  });
}

/*  delete customer  */
Customer.remove = (id, result) => {
  sql.query("DELETE FROM customers WHERE id = ?", id, (err,res) => {
    if(err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    //no result
    if(res.affectedRows == 0 ) {
      result({kind: "not found"}, null);
      return;
    }

    console.log("deleted customer with id: ", id);
    result(null, res);
  });
}

/*  delete customer  all */
Customer.removeAll = result => {
  sql.query("DELETE FROM customers", (err,res) => {
    if(err) {
      console.log("error", err);
      result(err, null);
      return;
    }

    //no result
    if(res.affectedRows == 0 ) {
      result({kind: "not found"}, null);
      return;
    } 

    console.log("deleted ${res.affectedRows} customers");
    result(null, res);
  });
};

module.exports = Customer;