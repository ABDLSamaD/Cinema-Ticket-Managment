import DashNav from "./DashNav";

const DashFoodDrinks = () => {
  return (
    <>
      <DashNav />
      <div id="foodDrinks" className="absolute_allDash">
        <h1>Food Drinks</h1>
        <div className="container">
          <div className="row">
            <div className="image-food">
              <img
                src="https://img.pikbest.com/png-images/qiantu/delicious-popcorn-cola-illustration_2608361.png!w700wp"
                alt="Does'nt"
              />
            </div>
            <div className="info-food">
              <h1>
                Popcorn <br /> <span>& Cola</span>
              </h1>
              <span>salt medium</span>
              <div className="order">
                <span>$ 2.22</span>
                <button type="button">Order</button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="image-food">
              <img
                src="https://i.etsystatic.com/25565595/r/il/24ba63/3276224092/il_570xN.3276224092_lw88.jpg"
                alt="Does'nt"
              />
            </div>
            <div className="info-food">
              <h1>
                Popcorn <br /> <span>& Crips</span>
              </h1>
              <span>cheese medium</span>
              <div className="order">
                <span>$ 3.01</span>
                <button type="button">Order</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashFoodDrinks;
