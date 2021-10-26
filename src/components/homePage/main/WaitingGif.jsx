import cat from '../../../assets/img/cat.gif'

export default function WaitingGif() {
    return (
        <img
            src={cat}
            style={{ width: '300px', margin: 'auto', display: 'block' }}
            alt='Loading'
        />
    )
}
