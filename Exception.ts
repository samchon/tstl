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
     * <p> Base class for standard exceptions. </p>
     *
     * <p> All objects thrown by components of the standard library are derived from this class. 
     * Therefore, all standard exceptions can be caught by catching this type by reference. </p>
     *
     * <ul>
     *  <li> Designed by C++ Reference - http://www.cplusplus.com/reference/exception/exception/
     * </ul>
     *
     * @author Migrated by Jeongho Nam
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
     * <ul>
     *  <li> Designed by C++ Reference - http://www.cplusplus.com/reference/stdexcept/logic_error/
     * </ul>
     *
     * @author Migrated by Jeongho Nam
     */
    export class LogicError
        extends Exception
    {
        public constructor(what: string)
        {
            super(what);
        }
    }

    export class DomainError
        extends LogicError
    {
        public constructor(what: string)
        {
            super(what);
        }
    }

    export class InvalidArgument
        extends LogicError
    {
        public constructor(what: string)
        {
            super(what);
        }
    }

    export class LengthError
        extends LogicError
    {
        public constructor(what: string)
        {
            super(what);
        }
    }

    export class OutOfRange
        extends LogicError
    {
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
     * <ul>
     *  <li> Designed by C++ Reference - http://www.cplusplus.com/reference/stdexcept/runtime_error/
     * </ul>
     *
     * @author Migrated by Jeongho Nam
     */
    export class RuntimeError
        extends Exception
    {
        public constructor(what: string)
        {
            super(what);
        }
    }

    export class OverflowError
        extends RuntimeError
    {
        public constructor(what: string)
        {
            super(what);
        }
    }

    export class UnderflowError
        extends RuntimeError
    {
        public constructor(what: string)
        {
            super(what);
        }
    }

    export class RangeError
        extends RuntimeError
    {
        public constructor(what: string)
        {
            super(what);
        }
    }

    export class SystemError
        extends RuntimeError
    {
        public constructor(what: string)
        {
            super(what);
        }
    }
}