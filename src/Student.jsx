import './StudentCard.css'

export const Student = ({info}) => {
    const {first, last, studentID, subject, year} = info;

    return (<li className="card">
            <h2>{last} {first}</h2>
            <div className='info'>
                <p>{subject}</p>
                <p>Year: {year}</p>
            </div>
        </li>)
}