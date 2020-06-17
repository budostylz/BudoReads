// Link.react.test.js
import React from 'react';
import BudoReads from './BudoReads.js'
import CurrentReads from './CurrentReads.js'
import WantToReads from './WantToReads.js'
import Reads from './Reads.js'
import renderer from 'react-test-renderer';

test('Display Currently Reading, Want to Read and Read Sections', () => {


    const currentlyReadsComponent = renderer.create(
        <CurrentReads
            currentBooks={[
                {
                    id: "8tNBKmPO5UC",
                    title: "Android Fully Loaded",
                    imageLinks: {
                        thumbnail: "http://books.google.com/books/content?id=H8tNBKmPO5UC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                    },
                    authors: ["Rob Huddleston"]
                }


            ]}
        />);


    const wantToReadsComponent = renderer.create(
        <WantToReads
            wantToReadBooks={[]}
        />);


    const readsComponent = renderer.create(
        <Reads
            readBooks={[]}
        />);


    let tree1 = currentlyReadsComponent.toJSON();
    expect(tree1).toMatchSnapshot();









});