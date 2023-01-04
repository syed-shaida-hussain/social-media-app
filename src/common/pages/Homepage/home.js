import '../../../style/utils.css';
import '../Homepage/home.css';
import { Sidebar } from '../../compoments/sidebar';
import Posts from '../../../features/posts/posts';

const Homepage = () => {
  return (
    <div>
      <div className="flex-r">
        <Sidebar />
        <Posts />
      </div>
    </div>
  );
};
export { Homepage };
