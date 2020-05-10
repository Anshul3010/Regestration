module.exports = function(Obj, ...allowedFeilds) {
    const newObject = {};
    Object.keys(Obj).forEach(el => {
      if (allowedFeilds.includes(el)) {
        newObject[el] = Obj[el];
      }
    });
    return newObject;
  };