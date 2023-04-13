import { AlertColor } from '@mui/material'
import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react'
import { IForm } from '../models/formModel'
import axios from 'axios'

const LiquidContext = createContext<ILiquidContext | undefined>(undefined)

interface IMsg {
  show: boolean
  type: AlertColor
  msg: string
}

interface ILiquidContext {
  msg: IMsg
  tanque: {
    capacidadTotal: number
    usado: number
    disponible: number
  }
  addLTS: (value: number) => void
  addMLTS: (value: number) => void
  addCM3: (value: number) => void
  handleHiddeMsg: () => void
  handleCapacidad: (value: number) => void
}

export const LiquidProvider: FC<Props> = ({ children }) => {

  const [msg, setMsg] = useState<IMsg>({
    show: false,
    type: 'info',
    msg: '',
  })

  const [tanque, setTanque] = useState({
    capacidadTotal: 30,
    usado: 0,
    disponible: 30,
  })

  /**
   * Disparar mensaje de error
   * @param msg Mensaje a mostrar
   */
  const handleError = (msg: string) => {
    setMsg({
      show: true,
      type: 'error',
      msg,
    })
  }

  /**
   * Disparar mensaje de éxito
   * @param msg Mensaje a mostrar
   */
  const handleSuccess = (msg: string) => {
    setMsg({
      show: true,
      type: 'success',
      msg,
    })
  }

  /**
   * Ocultar mensaje
   */
  const handleHiddeMsg = () => {
    setMsg({
      ...msg,
      show: false,
    })
  }

  /**
   * Persistir datos en la Base de datos
   * @param values Valores a almacenar
   */
  const persistData = async (values: IForm) => {
    const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/api/form`, values)
  }
  
  /**
   * Establecer nueva capacidad
   * @param value Valor a establecer
   */
  const handleCapacidad = (value: number) => {
    setTanque({
      ...tanque,
      capacidadTotal: value,
      disponible: value - tanque.usado,
    })
  }

  /**
   * Agregar Litros
   * @param value Valor a adicionar
   */
  const addLTS = (value: number) => {
    const CM3 = value * 1000
    const nuevoUsado = CM3 + tanque.usado
    if (nuevoUsado > tanque.capacidadTotal) {
      handleError(`El tanque no tiene la suficiente capacidad para agregar ${value} LTS (${CM3} CM3).`)
    } else {
      setTanque({
        ...tanque,
        usado: nuevoUsado,
        disponible: tanque.capacidadTotal - nuevoUsado,
      })
      handleSuccess(`Se han agregado ${value} LTS (${CM3} CM3) correctamente.`)
      persistData({
        id: null,
        accion: `Agregar LTS: ${value}`,
        valorAnterior: `usado: ${tanque.usado} CM3`,
        valorNuevo: `usado: ${nuevoUsado} CM3`,
      })
    }
  }

  /**
   * Agregar Milímetros cúbicos
   * @param value Valor a adicionar
   */
  const addMLTS = (value: number) => {
    const CM3 = value * 0.001
    const nuevoUsado = CM3 + tanque.usado
    if (nuevoUsado > tanque.capacidadTotal) {
      handleError(`El tanque no tiene la suficiente capacidad para agregar ${value} MLTS (${CM3} CM3).`)
    } else {
      setTanque({
        ...tanque,
        usado: nuevoUsado,
        disponible: tanque.capacidadTotal - nuevoUsado,
      })
      handleSuccess(`Se han agregado ${value} MLTS (${CM3} CM3) correctamente.`)
      persistData({
        id: null,
        accion: `Agregar MLTS: ${value}`,
        valorAnterior: `usado: ${tanque.usado} CM3`,
        valorNuevo: `usado: ${nuevoUsado} CM3`,
      })
    }
  }

  /**
   * Agregar Centímetros cúbicos
   * @param value Valor a adicionar
   */
  const addCM3 = (value: number) => {
    const CM3 = value
    const nuevoUsado = CM3 + tanque.usado
    if (nuevoUsado > tanque.capacidadTotal) {
      handleError(`El tanque no tiene la suficiente capacidad para agregar ${value} CM3.`)
    } else {
      setTanque({
        ...tanque,
        usado: nuevoUsado,
        disponible: tanque.capacidadTotal - nuevoUsado,
      })
      handleSuccess(`Se han agregado ${CM3} CM3 correctamente.`)
      persistData({
        id: null,
        accion: `Agregar CM3: ${value}`,
        valorAnterior: `usado: ${tanque.usado} CM3`,
        valorNuevo: `usado: ${nuevoUsado} CM3`,
      })
    }
  }

  return (
    <LiquidContext.Provider
      value={{
        tanque,
        msg,
        addLTS,
        addMLTS,
        addCM3,
        handleHiddeMsg,
        handleCapacidad,
      }}
    >
      {children}
    </LiquidContext.Provider>
  )
}

interface Props {
  children?: ReactNode
}

export const useLiquidContext = () => {
  const context = useContext(LiquidContext)
  if (context === undefined) {
    throw new Error('useLiquidContext must be used within a LiquidProvider')
  }
  return context
}