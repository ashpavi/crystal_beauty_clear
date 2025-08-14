export default function ForgetPasswordPage() {
    return (
        <div>
            <h1>Forget Password</h1>
            <form>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
                <button type="submit">Send Reset Link</button>
            </form>
        </div>
    );
}
