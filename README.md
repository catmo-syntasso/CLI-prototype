# CLI-prototype
Repo for testing out the CLI prototyping features found in this blog https://medium.com/hackernoon/adventures-in-prototyping-a-cli-e95aff625b42

You need node and the packages:
- colors https://github.com/marak/colors.js/
- node-spinner https://github.com/helloIAmPau/node-spinner

For usage run the following:
`./promise-builder.js -h`

The `template` command will copy the promise.yaml and replace metadata.name with the string following -p (--promise).
The `validate` commmand will be successful against cat-promise.yaml and fail otherwise. It also should accept a -r but will fail because coding hard
