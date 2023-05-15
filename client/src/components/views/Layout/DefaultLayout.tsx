type DefaultLayoutProps = {
    children: React.ReactNode;
}

function DefaultLayout(props : DefaultLayoutProps) : JSX.Element {
    return (
        <header className="App-header">
            <div>
                <h1>Pokemon Dictionary</h1>
            </div>
            {props.children}
        </header>
    )
}

export default DefaultLayout;
