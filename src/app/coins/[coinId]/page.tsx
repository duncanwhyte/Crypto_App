export default function Coin({params} : {params: {coinId: string}}) {
    return (
        <main>
            {params.coinId}
        </main>
    )
}