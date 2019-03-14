// @format

import { makeSection } from "./makeSection";

test('makeSection', () => {
    expect( makeSection([ '   foo/this', 'foo/that' ]) ).toEqual(
        [
            '   foo Files=foo {',
            '     this',
            '     that',
            '   }'
        ]
    )
}
    );
