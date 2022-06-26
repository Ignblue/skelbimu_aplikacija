import "./SkelbimasBigEdit.css"
import { useState, createRef, useEffect } from "react"
import axios from "axios"
 
const SkelbimasBigEdit = ({ _id, handle_close, set_state_status_text }) =>
{
    //success loading error
    const [state_status, set_state_status] = useState("")
 
    const [state_skelbimas, set_state_skelbimas] = useState({})
 
    const handle_read = async (_id) =>
    {
        try
        {
            set_state_status("loading")
            const result = await axios({
                method: "get",
                url: `/api/skelbimai/${_id}`
            })
            set_state_status("success")
            set_state_skelbimas(result.data)
        }
        catch (err)
        {
            set_state_status("error")
        }
    }
 
    useEffect(() => { handle_read(_id) }, [])
 
    const handle_update = async (_id, data) =>
    {
        try
        {
            set_state_status_text("Vykdoma...")
            const result = await axios({
                method: "patch",
                url: `/api/skelbimai/${_id}`,
                data: data
            })
            set_state_status_text("Atlikta")
            setTimeout(() => { set_state_status_text("") }, 1000)
            handle_read(_id)
        }
        catch (err)
        {
            set_state_status_text("Klaida")
            setTimeout(() => { set_state_status_text("") }, 1000)
        }
    }
 
    if (state_status === "loading")
    {
        return (
            <div className="SkelbimasBig">
                <h1>loading...</h1>
                <button onClick={handle_close}>close</button>
            </div>
        )
    }
 
    if (state_status === "error")
    {
        return (
            <div className="SkelbimasBig">
                <h1>error</h1>
                <button onClick={handle_close}>close</button>
            </div>
        )
    }
 
    if (state_status === "success")
    {
        return (
            <div className="SkelbimasBigEdit">
 
                <img src={state_skelbimas.nuotrauka_base64} />
 
                <input type="file" onChange={(param) =>
                {
                    const fileReader_1 = new FileReader()
 
                    fileReader_1.addEventListener('loadend', () =>
                    {
                        const copy_of_state_skelbimas = { ...state_skelbimas }
                        copy_of_state_skelbimas.nuotrauka_base64 = fileReader_1.result
                        set_state_skelbimas(copy_of_state_skelbimas)
                    })
 
                    fileReader_1.readAsDataURL(param.target.files[0])
                }}
                />
 
                <input type="text" value={state_skelbimas.pavadinimas} onChange={(param_1) =>
                {
                    const copy_of_state_skelbimas = { ...state_skelbimas }
                    copy_of_state_skelbimas.pavadinimas = param_1.target.value
                    set_state_skelbimas(copy_of_state_skelbimas)
                }} />
 
                <textarea value={state_skelbimas.aprasas} onChange={(param_1) =>
                {
                    const copy_of_state_skelbimas = { ...state_skelbimas }
                    copy_of_state_skelbimas.aprasas = param_1.target.value
                    set_state_skelbimas(copy_of_state_skelbimas)
                }} />
 
                <input type="number" value={state_skelbimas.kaina} onChange={(param_1) =>
                {
                    const copy_of_state_skelbimas = { ...state_skelbimas }
                    copy_of_state_skelbimas.kaina = param_1.target.value
                    set_state_skelbimas(copy_of_state_skelbimas)
                }} />
 
                <button onClick={() =>
                {
                    const copy_of_state_skelbimas = { ...state_skelbimas }
                    delete copy_of_state_skelbimas._id
                    delete copy_of_state_skelbimas.__v
                    delete copy_of_state_skelbimas.autorius
                    delete copy_of_state_skelbimas.komentarai
                    handle_update(_id, copy_of_state_skelbimas)
                }
                }>įrašyti</button>
 
                <button onClick={handle_close}>uždaryti</button>
 
            </div >
        )
    }
}
 
export default SkelbimasBigEdit