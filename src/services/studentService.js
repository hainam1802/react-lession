import api from "./api";

const list = () => {
  return api.get(api.url.students)
};

const get = (id) => {
  return api.get(`${api.url.students}/${id}`)
};

const add = (data) => {
  return api.post(api.url.students, data)
};

const update = (id, data) => {
  return api.put(`${api.url.students}/${id}`, data)
};

const remove = (id) => {
  return api.delete(`${api.url.students}/${id}`)
};

const studentsService = {
  list,
  get,
  add,
  update,
  delete: remove,
};

export default studentsService;
