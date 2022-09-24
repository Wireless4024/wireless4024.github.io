import {is_whitespace} from "./args_parser"

it('should detect whitespace', function () {
	expect(is_whitespace(' '))
	expect(is_whitespace('\n'))
	expect(is_whitespace('\r'))
	expect(is_whitespace('\t'))
}); 