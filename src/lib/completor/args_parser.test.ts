import {__private__} from "./args_parser"

const {
	      is_whitespace,
	      normalize_text_token,
	      peek_eq
      } = __private__

it('should detect whitespace', function () {
	expect(is_whitespace(' '))
	expect(is_whitespace('\n'))
	expect(is_whitespace('\r'))
	expect(is_whitespace('\t'))
});

it('should normalize escaped text', function () {
	expect(normalize_text_token('\\\\')).toEqual('\\')
	expect(normalize_text_token('hello\ world')).toEqual('hello world')
	expect(normalize_text_token('"hello world"')).toEqual('hello world')
	expect(normalize_text_token("'hello world'")).toEqual('hello world')
});

it('should peek text and check if equals', function () {
	expect(peek_eq('hello world', 6, "world"))
	expect(!peek_eq('hello world', 7, "world"))
}); 