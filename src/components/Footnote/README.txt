For footers you need various links throughout the page and one chunk at the bottom
with all the data for the links to link to. This is different from other components,
which are either simple or can utilize inheritance since they render fully in one spot.
Due to this issue I made two completely separate components: Links which can be put
in individually and one Section which can be put in separately. Since they render
all over the place I don't know of any way to make one be a child/relation of the
other, like other components do in their index.ts files.

The links will automatically work once they render the HTML, this is merely an issue
of how I had to format the files (2 sub-folders for the 2 components)