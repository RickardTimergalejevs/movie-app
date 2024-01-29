import Button from '../../components/common/Button/Button'
import Input from '../../components/common/Input/Input'

const Admin = () => {
  return (
    <div>
      <h1>Admin</h1>
      <h1>Create new session</h1>
      <div>
        <p>Select movie</p>
        <div>
          <select name="" id="">
            <option value="option1">Variant 1</option>
          </select>
        </div>
        <div>
          <p>Select city</p>
          <div>
            <select name="" id="">
              <option value="option1">Variant 1</option>
            </select>
          </div>
        </div>
        <div>
          <input type="date" />
          <p>ShowDate</p>
        </div>
        <div>
          <input type="time" />
          <p>DisplayType</p>
        </div>
      </div>
      <Button children="Create" color="green" />
    </div>
  )
}

export default Admin
