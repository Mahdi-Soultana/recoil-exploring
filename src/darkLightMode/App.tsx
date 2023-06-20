import CodeHighlighter from '../component/CodeHighlighter';

function ThemeMode() {
  return (
    <div className="w-full h-full p-4 max-w-2xl">
      <p className=" text-lg capitalize mb-10 underline underline-offset-4">
        dark light Theme using basic Atom 🥬
      </p>
      <li className="mb-3 mt-12">
        to use recoil you need to start adding you atoms state 🥬
      </li>
      <CodeHighlighter
        key={1}
        code={`
        //             atom<StateTypes>
        const backgroundAtom = atom<boolean>({
          key: 'backgroundAtom',
          default: false,
        });



        `}
      />
      <li className=" my-3 mt-12 ">
        using an atom is like a useState hook just we call it with
        <b className="underline pl-2">
          <i> useRecoilState(AtomName)</i>
        </b>
      </li>
      <CodeHighlighter
        key={2}
        code={`
        const [background , setBackground] = useRecoilState(backgroundAtom);

        function onToggle(onOff:boolean){
          setBackground(onOff)
          //or we call setBackground with a function argument that
          //has a prevState as a paramter

          setBackground(prevState=>!prevState)

          //we are switching backgroundState from prevState
        }

        `}
      />
      <p className="my-10">
        {' '}
        that's it 👍,that all to takes to start using atoms recoil;
        <a
          title="recoil documentation site"
          className="underline text-blue-600 pl-4 hover:opacity-50"
          target="_blank"
          href="https://recoiljs.org/docs/introduction/getting-started"
        >
          recoil documentation site
        </a>
      </p>
    </div>
  );
}

export default ThemeMode;
