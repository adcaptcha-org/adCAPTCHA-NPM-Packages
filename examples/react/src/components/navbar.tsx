import logo from '../assets/logo_gradient.png'

function Navbar() {

  return (
    <div>
      <div className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 justify-between">
              <div className="flex flex-1 items-center justify-center sm:items-stretch">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto mr-6"
                    src={logo}
                    alt="adCAPTCHA logo"
                  />
                  <p className="font-semibold">NPM React Package Example</p>
                </div>
              </div>
            </div>
          </div>
    </div>
    </div>
  );
}

export default Navbar;
