module.exports = function filterQuery(req, res, next) {
  const query = { ...req.query };
  if (query.height === "undefined") delete query.height;
  if (query.weight === "undefined") delete query.weight;
  if (query.name === "undefined") delete query.name;
  if (query.status === "undefined") delete query.status;
  if (query.typeOfAnimal === "undefined") delete query.typeOfAnimal;
  req.query = query;
  next();
};
