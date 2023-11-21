import Image from 'next/image';
import { GrAddCircle } from 'react-icons/gr';

const Comentary = () => {
  return (
    <div>
      <div className="bg-green-800  rounded-md border-2 border-fuchsia-200/20">
        <div className="flex gap-4">
          <button>
            <GrAddCircle size={30} />
          </button>
          <input
            type="text"
            placeholder="Comment something.."
            className="bg-transparent outline-none"
          />
        </div>

        <div className="">
          <div className="flex" key="">
            <div className="flex">
              <Image
                src="/p1.jpeg"
                alt=""
                width={50}
                height={50}
                className=""
              />

              <div className="">
                <div className="">boss</div>
                <div className="">12.03.2022</div>
              </div>
            </div>
            <p className="">
              Estamos bien, sobre los billete de sien, no te preucupe porque
              tamo bien, tamo bien yeee. To lo mio etan bien:D
            </p>
          </div>
        </div>
        {/* Puedes agregar estilos futuristas aquí */}
      </div>
    </div>
  );
};

export default Comentary;
