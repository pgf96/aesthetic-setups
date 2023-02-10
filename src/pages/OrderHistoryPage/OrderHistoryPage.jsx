import { checkToken } from '../../utilities/users-service';

const OrderHistoryPage = () => {

  async function handleCheckToken() {
    const expDate = await checkToken();
    console.log(expDate);
  }

  return (
    <>
    <h1>OrderHistoryPage</h1>
    <button onClick={handleCheckToken}> check token</button>
    </>
  )
}
export default OrderHistoryPage