/* Định nghĩa đường dẫn các api */
const apiUrl = {
  // Demo
  // Quản lý nhóm người dùng
  GET_All_NHOM_NGUOI_DUNG: "api/Role/GetRoles",
  GET_All_NGUOI_DUNG: "api/Identity/GetAllPaging",
  GET_ROLE: "api/Role/GetRole",
  GET_USER: "api/Identity/GetById",
  CREATE_ROLE: "api/Role/CreateRole",
  CREATE_USER: "api/Identity/Create",
  DELETE_ROLE: "api/Role/DeleteRole",
  DELETE_USER: "api/Identity/DeleteUserById",
  UPDATE_ROLE: "api/Role/UpdateRole",
  UPDATE_USER: "api/Identity/Update",
  // End Demo


};
export default apiUrl;
