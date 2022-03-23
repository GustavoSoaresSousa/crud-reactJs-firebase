import React, {useEffect, useState} from "react";
import { RegistrationForm } from "./RegistrationForm";
import {db} from "../services/firebase-config"
import { ref, onValue, remove } from "firebase/database";

export function Register() {

  const [dadosUsers, setDadosUsers] = useState({});

  const [idAtual, setIdAtual] = useState(' ');

  useEffect(() => {
    const readUser = ref(db, 'users')
    onValue(readUser, (snapshot) => {
      if(snapshot.val() != null ){
        setDadosUsers({
          ...snapshot.val()
        })
      } else {
        setDadosUsers({})
      }
    })
  },[]);

  async function deleteUser(key){
    if(window.confirm("Deseja realmente deletar esse usuário ?")){
     await remove(ref(db, '/users/' + key ))
    }
  }
 
  return (
    <>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4">Cadastro</h1>
          <p className="lead"></p>
        </div>
      </div>

      <div className="row">
            <div className="col-md-5">
                <RegistrationForm {...({idAtual, dadosUsers, setIdAtual})} />
            </div>
            <div>
              <div className="col-md-7">
                <table className="table table-boderless table-striped">
                  <thead className="thead-ligth">
                  <tr>
                    <td>Nome completo</td>
                    <td>CPF</td>
                    <td>Telefone</td>
                    <td>E_mail</td>
                    <td>Endereço</td>
                  </tr>
                  </thead>

                  <tbody>
                    {
                      Object.keys(dadosUsers).map(id => {
                        return <tr key={id}>
                          <td> {dadosUsers[id].name}</td>
                          <td> {dadosUsers[id].cpf}</td>
                          <td> {dadosUsers[id].phone}</td>
                          <td> {dadosUsers[id].email}</td>
                          <td> {dadosUsers[id].address}</td>

                          <td>
                            <a className="btn btn-primary" onClick={ () => {setIdAtual(id)}}>
                              <i className="fas fa-pencil-alt"></i>
                            </a>

                            <a className="btn btn-danger" onClick={() => deleteUser(id)}>
                            <i className="fas fa-trash-alt"></i>
                            </a>
                          </td>
                        </tr>
                      })
                    }
                  </tbody>
                </table>
              </div>

            </div>
        </div>
    </>
  )
}