import styles from './Message.module.css'
import {useState, useEffect} from 'react'

function Message({type, msg}) {
    const [visible, setVisible] = useState(false)

    useEffect(() =>{ //Mostrar a imagem e remove-la após 3 segundos
        if(!msg){
            setVisible(false)
            return
        }

        setVisible(true)
        const timer = setTimeout(() => {
            setVisible(false)
        }, 3000)

        return () => clearTimeout(timer)
    }, [msg])

    return (
        <>
            {visible && (
                <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
            )}
        </>
    )
}
export default Message
