build: dropdown.css index.js components
	@component build

components:
	@component install

clean:
	rm -fr build components

.PHONY: clean
