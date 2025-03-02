import {ReactElement,useEffect} from 'react'
import { FaWhatsapp } from 'react-icons/fa';
import Header from "../components/header";
import AnimatedFooter from "../components/footer";

const ShippingPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-2">Shipping & Returns</h1>
        </header>

        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-10">
          <div className="px-6 py-8">
            <h2 className="text-2xl font-bold text-primary border-b border-gray-200 pb-4 mb-6">Shipping Policy</h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                We strive to provide you with the best possible shipping experience. Please review our shipping policy below:
              </p>
              <ul className="list-decimal pl-5 space-y-3">
                <li className="text-gray-700">
                  All orders will take <span className="font-semibold">3-5 working days</span> to be delivered after processing.
                </li>
                <li className="text-gray-700">
                  The shipping charges are already included in the product price. There are no additional shipping fees.
                </li>
                <li className="text-gray-700">
                  Orders are processed within 24-48 hours after payment confirmation.
                </li>
                <li className="text-gray-700">
                  We ship to all major cities and locations across the country.
                </li>
                <li className="text-gray-700">
                  You will receive a tracking number once your order has been shipped.
                </li>
                <li className="text-gray-700">
                  Delivery times may vary during peak seasons or due to unforeseen circumstances.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-10">
          <div className="px-6 py-8">
            <h2 className="text-2xl font-bold text-primary border-b border-gray-200 pb-4 mb-6">Returns & Exchanges</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-primary-light mb-3">DEFECTIVE/DAMAGED</h3>
                <ol className="list-decimal pl-5 space-y-3">
                  <li className="text-gray-700">
                    You can always return items if they are defective or sent incorrectly. Please know that you must provide us with a written record of the reason for return or exchange within 5 days of receiving the item.
                  </li>
                  <li className="text-gray-700">
                    To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.
                  </li>
                  <li className="text-gray-700">
                    To complete your return, we require a receipt or proof of purchase.
                  </li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary-light mb-3">EXCHANGES (if applicable)</h3>
                <ol className="list-decimal pl-5 space-y-3" start="4">
                  <li className="text-gray-700">
                    We only replace items if they are defective, damaged or the wrong sizes delivered from our end.
                  </li>
                  <li className="text-gray-700">
                    We also offer an exchange if the customer does not fit their ordered sizes. In this case, the customer will be responsible for shipping charges both ways.
                  </li>
                  <li className="text-gray-700">
                    Customer needs to return the product via traceable delivery i.e. courier or registered post at his own expense to our address.
                  </li>
                  <li className="text-gray-700">
                    No Return/Refund/Exchange will be provided on the CUSTOMIZED ORDER/CUSTOM KITS if the customer does not fit their ordered sizes.
                  </li>
                  <li className="text-gray-700">
                    No Return/Refund/Exchange will be provided on original/player version/fan version shirts.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-2xl font-bold text-primary border-b border-gray-200 pb-4 mb-6">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              For any questions or concerns regarding returns or exchanges, please contact us on WhatsApp with proof for return.
            </p>
            <a 
            href="https://wa.me/923421607309" 
            className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
            <FaWhatsapp className="mr-2" size={20} />
            Contact on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
    <AnimatedFooter/>
    </>
  )
}

export default ShippingPolicy
