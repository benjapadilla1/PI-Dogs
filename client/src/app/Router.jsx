import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Landing from '../views/Landing/Landing'
import Error from '../views/Error/Error'
import Home from '../views/Home/Home'
import Detail from '../views/Detail/Detail'
import Form from '../views/Form/Form'

export default function Router() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/create" element={<Form />} />
                <Route path="/home" element={<Home />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </>
    )
}
