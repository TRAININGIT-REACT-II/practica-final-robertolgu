import { Component } from "react";

class ErrorBoundary extends Component {
    constructor(props){
        super(props);

        this.state = {
            error: false
        };
    }

    static getDerivedStateFromError() {
        return {
          error: true
        };
      }


    componentDidCatch(error, info) {
        console.log(error, info);
      }

    onClick() {
        this.props.onReset();
        this.setState({ error: false });
    }

    render(){
        // Si ha habido un error, mostramos el mensaje y un botón para reiniciar el estado
        if (this.state.error === true) {
            return (
            <section aria-label="Hubo un error en la aplicacion">
                <h1>{this.props.message}</h1>
                <button onClick={this.onClick}>Reintentar</button>
            </section>
            );
        }
  
      // Si no hay errores, mostramos los nodos descendientes
      return this.props.children;
    }
}