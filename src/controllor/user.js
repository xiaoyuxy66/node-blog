const loginCheck = (username, password) => {
  //使用假数据
  if (username === "zhangsan" && password === "123") {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  loginCheck
};