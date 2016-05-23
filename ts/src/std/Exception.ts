namespace std
{
    /* =========================================================
        + EXCEPTION
            + LOGIC_ERROR
                - DOMAIN_ERROR
                - INVALID_ARGUMENT
                - LENGTH_ERROR
                - OUT_OF_RANGE
            + RUNTIME_ERROR
                - OVERFLOW_ERROR
                - RANGE_ERROR
                - SYSTEM_ERROR
                - UNDERFLOW_ERROR
    ========================================================= */
    /**
     * <p> Standard exception class. </p>
	 *  
     * <p> Base class for standard exceptions. </p>
     *
     * <p> All objects thrown by components of the standard library are derived from this class. 
     * Therefore, all standard exceptions can be caught by catching this type by reference. </p>
     *
     * <p> <img src="../assets/images/design/exceptions.png" width="100%" /> </p>
     * 
     * @reference http://www.cplusplus.com/reference/exception/exception
     * @author Jeongho Nam <http://samchon.org>
     */
    export class Exception
    {
        /**
         * A message representing specification about the Exception.
         */
        protected message: string;

        /**
         * Default Constructor.
         */
        public constructor();

        /**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        public constructor(what: string);

        public constructor(what: string = "")
        {
            this.message = what;
        }

        /**
         * <p> Get string identifying exception. </p>
         * <p> Returns a string that may be used to identify the exception. </p>
         *
         * <p> The particular representation pointed by the returned value is implementation-defined. 
         * As a virtual function, derived classes may redefine this function so that specify value are 
         * returned. </p>
         */
        public what(): string
        {
            return this.message;
        }
    }

    /* =========================================================
        + LOGIC_ERROR
            - DOMAIN_ERROR
            - INVALID_ARGUMENT
            - LENGTH_ERROR
            - OUT_OF_RANGE
	========================================================= */
    /**
     * <p> Logic error exception. </p>
     *
     * <p> This class defines the type of objects thrown as exceptions to report errors in the internal 
     * logical of the program, such as violation of logical preconditions or class invariants. </p>
     *
     * <p> These errors are presumably detectable before the program executes. </p>
     *
     * <p> It is used as a base class for several logical error exceptions. </p>
     *
     * <p> <img src="../assets/images/design/exceptions.png" width="100%" /> </p>
     * 
     * @reference http://www.cplusplus.com/reference/stdexcept/logic_error
     * @author Jeongho Nam <http://samchon.org>
     */
    export class LogicError
        extends Exception
    {
		/**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        public constructor(what: string)
        {
            super(what);
        }
    }

	/**
	 * <p> Domain error exception. </p>
	 *
	 * <p> This class defines the type of objects thrown as exceptions to report domain errors. </p>
	 *
	 * <p> Generally, the domain of a mathematical function is the subset of values that it is defined for. 
	 * For example, the square root function is only defined for non-negative numbers. Thus, a negative number 
	 * for such a function would qualify as a domain error. </p>
	 *
	 * <p> No component of the standard library throws exceptions of this type. It is designed as a standard 
	 * exception to be thrown by programs. </p>
	 *
     * <p> <img src="../assets/images/design/exceptions.png" width="100%" /> </p>
     * 
     * @reference http://www.cplusplus.com/reference/stdexcept/domain_error
     * @author Jeongho Nam <http://samchon.org>
	 */
    export class DomainError
        extends LogicError
    {
		/**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        public constructor(what: string)
        {
            super(what);
        }
    }

	/**
	 * <p> Invalid argument exception. </p>
	 *
	 * <p> This class defines the type of objects thrown as exceptions to report an invalid argument. </p>
	 *
	 * <p> It is a standard exception that can be thrown by programs. Some components of the standard library 
	 * also throw exceptions of this type to signal invalid arguments. </p>
	 *
     * <p> <img src="../assets/images/design/exceptions.png" width="100%" /> </p>
     * 
     * @reference http://www.cplusplus.com/reference/stdexcept/invalid_argument
     * @author Jeongho Nam <http://samchon.org>
	 */
    export class InvalidArgument
        extends LogicError
    {
		/**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        public constructor(what: string)
        {
            super(what);
        }
    }

	/**
	 * <p> Length error exception. </p>
	 *
	 * <p> This class defines the type of objects thrown as exceptions to report a length error. </p>
	 *
	 * <p> It is a standard exception that can be thrown by programs. Some components of the standard library, 
	 * such as vector and string also throw exceptions of this type to signal errors resizing. </p>
	 * 
     * <p> <img src="../assets/images/design/exceptions.png" width="100%" /> </p>
     * 
     * @reference http://www.cplusplus.com/reference/stdexcept/length_error
     * @author Jeongho Nam <http://samchon.org>
	 */
    export class LengthError
        extends LogicError
    {
		/**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        public constructor(what: string)
        {
            super(what);
        }
    }

	/**
	 * <p> Out-of-range exception. </p>
	 *
	 * <p> This class defines the type of objects thrown as exceptions to report an out-of-range error. </p>
	 *
	 * <p> It is a standard exception that can be thrown by programs. Some components of the standard library, 
	 * such as vector, deque, string and bitset also throw exceptions of this type to signal arguments 
	 * out of range. </p>
	 * 
     * <p> <img src="../assets/images/design/exceptions.png" width="100%" /> </p>
     * 
     * @reference http://www.cplusplus.com/reference/stdexcept/out_of_range
     * @author Jeongho Nam <http://samchon.org>
	 */
    export class OutOfRange
        extends LogicError
    {
		/**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        public constructor(what: string)
        {
            super(what);
        }
    }

    /* =========================================================
        + RUNTIME_ERROR
            - OVERFLOW_ERROR
            - RANGE_ERROR
            - SYSTEM_ERROR
            - UNDERFLOW_ERROR
	========================================================= */
    /**
     * <p> Runtime error exception. </p>
     *
     * <p> This class defines the type of objects thrown as exceptions to report errors that can only be 
     * detected during runtime. </p>
     *
     * <p> It is used as a base class for several runtime error exceptions. </p>
     *
     * <p> <img src="../assets/images/design/exceptions.png" width="100%" /> </p>
     * 
     * @reference http://www.cplusplus.com/reference/stdexcept/runtime_error
     * @author Jeongho Nam <http://samchon.org>
     */
    export class RuntimeError
        extends Exception
    {
		/**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        public constructor(what: string)
        {
            super(what);
        }
    }

	/**
	 * <p> Overflow error exception. </p>
	 *
	 * <p> This class defines the type of objects thrown as exceptions to arithmetic overflow errors. </p>
	 *
	 * <p> It is a standard exception that can be thrown by programs. Some components of the standard library 
	 * also throw exceptions of this type to signal range errors. </p>
	 *
     * <p> <img src="../assets/images/design/exceptions.png" width="100%" /> </p>
     * 
     * @reference http://www.cplusplus.com/reference/stdexcept/outflow_error
     * @author Jeongho Nam <http://samchon.org>
	 */
    export class OverflowError
        extends RuntimeError
    {
		/**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        public constructor(what: string)
        {
            super(what);
        }
    }

	/**
	 * <p> Underflow error exception. </p>
	 *
	 * <p> This class defines the type of objects thrown as exceptions to arithmetic underflow errors. </p>
	 *
	 * <p> No component of the standard library throws exceptions of this type. It is designed as a standard 
	 * exception to be thrown by programs. </p>
	 *
     * <p> <img src="../assets/images/design/exceptions.png" width="100%" /> </p>
     * 
     * @reference http://www.cplusplus.com/reference/stdexcept/underflow_error
     * @author Jeongho Nam <http://samchon.org>
	 */
    export class UnderflowError
        extends RuntimeError
    {
		/**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        public constructor(what: string)
        {
            super(what);
        }
    }

	/**
	 * <p> Range error exception. </p>
	 *
	 * <p> This class defines the type of objects thrown as exceptions to report range errors in internal 
	 * computations. </p>
	 *
	 * <p> It is a standard exception that can be thrown by programs. Some components of the standard library 
	 * also throw exceptions of this type to signal range errors. </p>
	 *
     * <p> <img src="../assets/images/design/exceptions.png" width="100%" /> </p>
     * 
     * @reference http://www.cplusplus.com/reference/stdexcept/range_error
     * @author Jeongho Nam <http://samchon.org>
	 */
    export class RangeError
        extends RuntimeError
    {
		/**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        public constructor(what: string)
        {
            super(what);
        }
    }
}