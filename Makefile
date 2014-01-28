
build: dropdown.css index.js components
	@component build --dev

components: component.json
	@component install --dev

clean:
	rm -fr build components

all:
	clear
	make clean
	make build

.PHONY: clean
