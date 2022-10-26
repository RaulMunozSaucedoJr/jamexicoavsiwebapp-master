import React from 'react'
import { PropagateLoader} from 'react-spinners';

const Loading = () => {
  return (
    <>
        <div className="container-fluid Loading center">
            <PropagateLoader
                color='#ffffff'
                size={100}
                aria-label="Cargando..."
            />
        </div>
    </>
  )
}

export default Loading;