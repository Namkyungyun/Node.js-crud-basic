const Customer = require("../models/customer");

// create new object 
exports.create = (req, res) => {
  if(!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const customer = new Customer({
    name: req.body.name,
    active: req.body.active
  });

  // save db
  Customer.create(customer, (err, data) => {
    if(err) {
      res.status(500).send({
        message: err.message || "Some error occured while creating the Customer"
      });
    }
    else res.send({"message": "create " + data.name + " !"});
  });
};

// select all
exports.findAll = (req, res) => {
  Customer.getAll((err, data) => {
    if(err) {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving customers."
      });
    } else res.send(data);
  });
};

// id로 조회
exports.findOne = (req,res)=>{
  Customer.findById(req.params.customerId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.customerId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Customer with id " + req.params.customerId
          });
        }
      } else res.send(data);
    });
};

// id로 갱신
exports.update = (req,res)=>{
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Customer.updateById(
    req.params.customerId,
    new Customer(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.customerId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.customerId
          });
        }
      } else res.send(data);
    }
  );
};

// id로 삭제
exports.delete = (req,res)=>{
  Customer.remove(req.params.customerId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.customerId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Customer with id " + req.params.customerId
          });
        }
      } else res.send({ message: `Customer was deleted successfully!` });
    });
};

// 전체 삭제
exports.deleteAll = (req,res)=>{
  Customer.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all customers."
        });
      else res.send({ message: `All Customers were deleted successfully!` });
    });
};
