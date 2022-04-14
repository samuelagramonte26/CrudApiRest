import Axios from "axios";
const Uris = {
    get: "http://localhost/crudApiRest/backendApiRest/public/api/personas",
    post: "http://localhost/crudApiRest/backendApiRest/public/api/personas/add",
    put: "http://localhost/crudApiRest/backendApiRest/public/api/personas/edit/",
    delete: "http://localhost/crudApiRest/backendApiRest/public/api/personas/delete/"
}
export const GetData = async (setPersonas) => {
    await Axios.get(Uris.get)
        .then(data => setPersonas(data.data))
        .catch(e => console.log(e))
}

export const DeleteData = async (id, handResult) => {
    await Axios.delete(`${Uris.delete}${id}`)
        .then(data => handResult(data))
        .catch(e => console.log(e))
}

export const PostData = async (handResult, handleForm) => {
    await Axios.post(Uris.post, handleForm)
        .then(data => {
            handResult(data)
        })
        .catch(e => console.log(e))
}
export const PutData = async (id,handleForm,handResult) => {
    await Axios.post(`${Uris.put}${id}`, handleForm)
      .then(data => {
        handResult(data)
      })
      .catch(e => console.log(e))
  }