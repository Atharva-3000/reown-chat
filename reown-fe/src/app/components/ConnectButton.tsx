export default function ConnectButton() {
    return (
        <appkit-button
            style={{ color: 'white', padding: '10px', border: '1px solid white' }}
            disabled={false}
            balance="show"
            size="md"
            label="Connect"
            loadingLabel="Connecting..."
        />
    )
}