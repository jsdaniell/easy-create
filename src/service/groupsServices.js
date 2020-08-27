import { api } from "./api";

export async function getGroups({ type, success, catchError }) {
  await api
    .get(`suites/${type}`)
    .then(async d => {
      success(d.data);
    })
    .catch(err => {
      const {
        response: {
          data: { error }
        }
      } = err;

        catchError(error);
    });
}

export async function getDocumentsFromGroup({type, id, success, catchError, paginate, lastDoc}) {

    let pag = ""

    if(paginate && lastDoc){
        pag = `lastDoc=${lastDoc}&navigate=${paginate}`
    }

  if (id) {
    await api
      .get(`suites/${type}/${id}?${pag}`)
      .then(d => {
        success(d.data);
      })
      .catch(err => {
        const {
          response: {
            data: { error }
          }
        } = err;

          catchError(error);
      });
  }
}

export async function addNewGroup({ type, name, success, catchError }) {
    api
        .post(`/suites`, {
            type: type,
            title: name
        })
        .then(async d => {
            success(d.data);
        })
        .catch(err => {
            const {
                response: {
                    data: { error }
                }
            } = err;

            catchError(error);
        });
}

export async function deleteGroup({type, id, success, catchError}) {
    await api.delete(`suites/${type}/${id}`).then(async d => {
        success(d.data)
    }).catch(err => {
            const {
                response: {
                    data: { error }
                }
            } = err;

        catchError(error);
        });

}

export async function deleteDocument({type, idGroup, idDocument, success, catchError}){
    await api.delete(`suites/${type}/${idGroup}/${idDocument}`).then(async d => {
        success(d.data)
    }).catch(err => {
        const {
            response: {
                data: { error }
            }
        } = err;

        catchError(error);
    });
}

export async function addingDocumentOnGroup({type, idGroup, success, catchError, data}){

    await api.post(`suites/${type}/${idGroup}/add`, data).then(d => {
        success(d.data)
    }).catch(err => {
        const {
            response: {
                data: { error }
            }
        } = err;

        catchError(error);
    });

}

