'use client';

import SearchBar from "./_components/SearchBar";

//TODO: Criar o dropdown com os meses

const Page = () => {
    return (
        <>
            <div className="flex items-center gap-x-4 px-4">
                <SearchBar placeholder={"Pesquisar"}/>
            </div>
        </>
    );
}

export default Page;